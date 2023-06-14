
import { loader } from '../assets';

const Loader = ({ title }) => (
  <div className=" flex justify-center items-center flex-col">
    <img src={loader} className=" w-32 h-32" />
    <h2 className=" text-white text-2xl font-bold mt-2">{title || 'Loading' }</h2>
  </div>
);

export default Loader;
