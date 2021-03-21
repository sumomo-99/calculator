import {
  Button,
  Container, 
  Header, 
  Icon,
  Table
} from 'semantic-ui-react'
import Link from 'next/link'
import Head from 'next/head'
import CalcButton from '../components/CalculatorButton'
import { useState } from 'react'

let memNum = 0
let calcFlag = false
let nextOperator = ''

export default function Home() {

  const [dispNum, setDispnum] = useState(0)

  const setDisplayNumber = (num) => {
    if (calcFlag) {
      setDispnum(num)
      calcFlag = false
    } else {
      setDispnum(dispNum * 10 + num)
    }
  }

  const numberCells = startNumber => {
    let cells = []
    for (let i = startNumber; i < startNumber + 3; i++) {
      cells.push(<Table.Cell key={i}><CalcButton setDisplay={() => setDisplayNumber(i)} num={i} /></Table.Cell>)
    }
    return cells
  }

  const allClear = () => {
    setDispnum(0)
    memNum = 0
  }

  const onCulculate = (operator) => {

    switch(nextOperator) {
      case 'addition':
        memNum += dispNum
        break
      case 'subtraction':
        memNum -= dispNum
        break
      case 'multiplication':
        memNum *= dispNum
        break
      case 'division':
        memNum /= dispNum
        break
      default:
        memNum = dispNum
    }

    nextOperator = operator
    calcFlag = true

    if (memNum / 10000000 >= 1 || memNum / 10000000 <= -1) {
      setDispnum('ERR')
    } else {
      setDispnum(memNum)
    }
  }

  return (
    <div>
      <Head>
        <title>Calculator</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container>
        <Header as="h1" textAlign="center">
          Calculator
          <Header.Subheader>
            &copy;2021 sumomo-99
          </Header.Subheader>
          <Header.Subheader>
            <Link href="https://github.com/sumomo-99/calculator">
              <Icon link size="big" name="github" />
            </Link>
            <Link href="https://twitter.com/sumomo_99">
              <Icon link size="big" name="twitter" />
            </Link>
          </Header.Subheader>
        </Header>
      </Container>

      <Container textAlign="center">
        <div className="display">
          {dispNum}
        </div>
        <Table basic="very" unstackable collapsing>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Button onClick={allClear}>AC</Button>
              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>
                <Button onClick={() => onCulculate('division')}>/</Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              {numberCells(7)}
              <Table.Cell>
                <Button onClick={() => onCulculate('multiplication')}>x</Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              {numberCells(4)}
              <Table.Cell>
                <Button onClick={() => onCulculate('subtraction')}>-</Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              {numberCells(1)}
              <Table.Cell>
                <Button onClick={() => onCulculate('addition')}>+</Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell key="0">
                <CalcButton setDisplay={() => setDisplayNumber(0)} num="0" />
              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>
                <Button onClick={() => onCulculate('equal')}>=</Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    </div>
  )
}