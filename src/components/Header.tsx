import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

interface CabeceraProps {
  titulo: string;
}

const Header = ({ titulo }: CabeceraProps) => {
  return (
    <div className="sticky top-0 bg-white p-4 flex items-center justify-between border-b z-10 shadow-md">
      <Link to="/aprender">
        <button className="p-2 rounded-full ">
          <FaArrowLeft className="h-5 w-5" />
        </button>
      </Link>
      <h1 className="font-bold text-lg">{titulo}</h1>
      <div />
    </div>
  );
};

export default Header;
