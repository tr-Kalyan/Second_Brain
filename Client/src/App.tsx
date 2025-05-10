// import ButtonUI from './components/ButtonUI/Button'
// import PlusIcon from './components/Icons/PlusIcon'
import {RegisterPage} from './pages/RegisterPage'
import Card from './components/CardUI/Card'


export default function App(){
  return(
    <div>
      {/* <ButtonUI variant="primary" size="lg" text={"Add Content"} startIcon={<PlusIcon/>} /> */}
      <RegisterPage />
      {/* <Card /> */}
    </div>
  )
}