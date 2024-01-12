export default function CounterFunction({ title, agree }) {
  return (
    <div>
      Func: {title} - Agree: {agree ? "Yes" : "No"}
    </div>
  );
}

/*
const CounterFunction = () =>{
    return (
        <div>
            My Counter Function content!
        </div>
    );
}

export default CounterFunction;
*/
