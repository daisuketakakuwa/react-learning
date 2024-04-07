import { useEffect, useState } from "react";

const FuncCompHooksCounter = () => {
    const [count, setCount] = useState(0);
    const incrementCount = () => setCount(count + 1);

    useEffect(() => {
        setCount(111)
    }, []);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={incrementCount}>Increment</button>
        </div>
    )
}

export default FuncCompHooksCounter;
