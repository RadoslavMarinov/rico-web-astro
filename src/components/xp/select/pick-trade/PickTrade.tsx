import { StepComp } from "../../step/Steps"

const PickTrade: StepComp = ({ back, done }) => {
  return <div>
    <div data-testid="heading">
      <h3 className='text-4xl'>Pick a trade </h3>
    </div>
    <div className="flex flex-row">
      <button onClick={back} className="p-6 bg-slate-300 m-2 hover:text-white active:bg-slate-400" >Go Back</button>
      <button onClick={done} className="p-6 bg-green-400 m-2 active:bg-green-500 hover:text-white ">Done</button>
    </div>
  </div>
}


export default PickTrade