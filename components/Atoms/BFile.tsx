import axios from "axios";
import { ChangeEvent, useCallback, useState } from "react"
import { FaUpload } from 'react-icons/fa';

const BFile: React.FC<InputProps> = (props) => {
  const [error, setError] = useState<string | undefined>();
  
  const triggerUploadFile = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('name', file.name);
    formData.append('type', file.type);

    const response = await axios.post('/api/image/create', formData);

    if (response.data.imageId === undefined) {
      setError("UPLOAD FAILED")
    } else {
      props.onChange(response.data.imageId);
    }    
  }, [props.onChange]);

  return (
      <div className="file">
        <label className="file-label">
          <input className="file-input" 
            type="file" 
            name="file"
            onChange={triggerUploadFile}
            />
          <span className="file-cta">
            <span className="file-icon">
              <FaUpload />
            </span>
            <span className="file-label">
              Choose a file…
            </span>
          </span>
        </label>
        {error && <p className="is-danger">{error}</p>}
      </div>
  )
}

export default BFile

type InputProps = {
  onChange: (newImageId: number) => void
}

