import { useState } from "react"
import RowsList from "./RowsList";
import MyRow from "./MyRow";

function App() {

  const [rows, setRows] = useState([]);
  const [numberRows, setNumberRows] = useState(0);
  const [sum, setSum] = useState(0);

  const [mode, setMode] = useState('view');

  const handleAdd = (key, sign, number, disabled) => {
    const newRow = {key:key, sign:sign, number:number, disabled:disabled};
    setRows((oldRows) => [...oldRows, newRow]);
    setNumberRows((oldNumberRows) => oldNumberRows+1);
    setSum((oldSum) => {
      return sign === '+' ? oldSum + Number(number) : oldSum - Number(number);
    })
    setMode('view');
    console.log(sum);
  }

  const handleEdit = (obj) => {
    console.log(obj);
    let newRows = rows.map((row) => 
      row.key === obj.key 
        ? { ...row, sign: obj.sign, number: Number(obj.number) || 0, disabled: row.disabled } 
        : {...row, number: Number(row.number)}
    )
    setRows(newRows);

    setSum(() => {
      // Recalculate sum only with valid numbers
      let newSum = 0;
      console.log(rows);
      newRows.forEach((row) => {
        if (!isNaN(row.number)) {
          newSum += row.sign === '+' ? Number(row.number) : -Number(row.number);
        }
      });
      return newSum;
    });
  }

  const handleDisable = (obj) => {
    console.log(obj);
    let newRows = rows.map((row) => {
      if (row.key === obj.key) {
        return obj;
      }
      else
        return row;
    })

    setRows(newRows);

    setSum(() => {
      let newSum = 0;
      newRows.forEach((row) => {
        if (row.disabled === 'false') {
          if (!isNaN(row.number)) {
            newSum += row.sign === '+' ? Number(row.number) : -Number(row.number);
          }
        }
      });
      return newSum;
    })
  }

  const handleDelete = (key) => {
    console.log(key);
    let newRows = rows.filter((row) => {
      if (row.key === key)
        return false;
      return true;
    })
    setRows(newRows);

    setSum(() => {
      let newSum = 0;
      newRows.forEach((row) => {
        if (row.disabled === 'false') {
          if (!isNaN(row.number)) {
            newSum += row.sign === '+' ? Number(row.number) : -Number(row.number);
          }
        }
      });
      return newSum;
    })
  }




  return (
    <>
      <div className="outerWrapper">
          <button className="addRow" onClick={() => setMode('add')}>Add Row</button>
          <RowsList rows={rows} mode={'view'} onEdit={handleEdit} onDisable={handleDisable} onDelete={handleDelete}/>

          {mode === 'add' && (
            <>
            <MyRow mode={'add'} onAdd={handleAdd} onCancel={() => {setMode('view')}} numberRows={numberRows}/> {/* Pass handleAdd to MyRow */}
            </>
            )
          }
        <p>Sum is {sum}</p>
      </div>
    </>
  )
}

export default App
