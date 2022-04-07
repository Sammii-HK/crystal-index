import { GetServerSideProps } from 'next';
import { Map } from '../../components/Organisms';
import prisma from '../../lib/prisma';
import { CrystalLocation } from '../../lib/types/location';

const MapView: React.FC<MapViewProps> = (props) => {
  return (
    <div className="container is-flex is-align-content-center locations-map">
      <Map locationData={props.locations} />
    </div>)
}

export default MapView

type MapViewProps = {
  locations: CrystalLocation[] 
}

export const getServerSideProps: GetServerSideProps<MapViewProps> = async () => {
  const locations = await prisma.location.findMany();
  return { props: { locations: locations }}
}