import {
  Button
} from 'semantic-ui-react'

const CalculatorButton = (props) => (
    <Button circular size="large" onClick={props.setDisplay}>{props.num}</Button>
)

export default CalculatorButton