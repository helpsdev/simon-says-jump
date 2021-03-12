import { useEffect, useState } from "react";

function Timer(){
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {

        const intervalId = setInterval(() => setSeconds(seconds => seconds + 1), 1000);
        return () => clearInterval(intervalId);
        
    }, [seconds])

    

    return(
        <div>
            <p>The elapsed time is {seconds}</p>
        </div>
        
    );
}

export default Timer;