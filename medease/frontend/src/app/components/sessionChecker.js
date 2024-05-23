import { useEffect } from 'react';
import { useRouter } from "next/navigation";

function useSessionChecker() {
    const router = useRouter();
    useEffect(() => {
        const interval = setInterval(() => {
            fetch('http://localhost:8000/api/users/checkSession', {credentials: "include"})
            .then(res => {
                // console.log(res.status)
                if (res.status === 401) {  // Assuming 401 means session expired
                    router.push('/login');
                }
            })
            .catch((err) => console.log('Error checking session:', err));
        }, 10000); // Check every 10 seconds

        return () => clearInterval(interval);
    }, []);
}
export default useSessionChecker;
