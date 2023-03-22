import Fab from '@mui/material/Fab';
const Game = ({isStart, showEachDog, setStart, resetButtonClick}) => {
    return (
        <div style = {{alignItems: "center", justifyContent:"center", display:"flex"}}>
        {isStart === false ? (
          <Fab variant="extended" onClick={()=> setStart(true)} sx={{width: 200}}>
            START
          </Fab>
        ) : (
          <div>
          {showEachDog()}
          <div style = {{alignItems: "center", justifyContent:"center", display:"flex"}}>
            <Fab variant="extended" onClick={resetButtonClick} sx={{width: 200, marginTop: 2}}>
              Reset
            </Fab>
          </div>
          </div>
        )}
      </div>
    )
}
export default Game