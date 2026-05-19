import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../api/user.api";
import { setUser } from "../redux/slices/authSlice";
import toast from "react-hot-toast";

const useFetchProfile = () => {
    const dispatch = useDispatch();
    const fetchProfile = async () => {
        try {
            const res = await getUserProfile();
            if (res?.success) {
                dispatch(setUser(res?.user));
                return res.data;
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch profile");
            return null;
        }
    };

    return { fetchProfile };
};

export default useFetchProfile;