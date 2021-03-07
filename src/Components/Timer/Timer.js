import { useEffect, useState } from "react";

function Timer(){
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {

        const intervalId = setInterval(() => setElapsedTime(elapsedTime => elapsedTime + 1), 1000);

        return () => clearInterval(intervalId);
    }, [])

    

    return(
        <div>
            <p>The elapsed time is {elapsedTime}</p>
        </div>
        
    );
}

export default Timer;