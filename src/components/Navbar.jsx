import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800">
            <div className="flex justify-around py-3 text-sm text-white">
                <Link to="/dashboard">Dashboard</Link>
                <span>Add</span>
                <span>Profile</span>
            </div>
        </div>
    );
};

export default Navbar;
