import { BTag, BTags } from '../../components/Atoms';

const BTagContainer: React.FC<InputProps> = (props) => {
  return (
    <BTags>
      {props.tags?.map(tag => <BTag label={tag} key={tag} /> )}
    </BTags>
  )
}

export default BTagContainer

type InputProps = {
  tags: string[] | undefined,
}

