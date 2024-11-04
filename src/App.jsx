import { useState } from "react"
import RowsList from "./RowsList";
import MyRow from "./MyRow";

function App() {

  const [rows, setRows] = useState([]);
  const [numberRows, setNumberRows] = useState(0);
  const [sum, setSum] = useState(0);

  const [mode, setMode] = useState('view');

  const handleAdd = (obj) => {
    const newRow = {key: obj.key, sign: obj.sign, number: obj.number, disabled: obj.disabled};
    setRows((oldRows) => [...oldRows, newRow]);
    setNumberRows((oldNumberRows) => oldNumberRows+1);
    setSum((oldSum) => {
      return obj.sign === '+' ? oldSum + Number(obj.number) : oldSum - Number(obj.number);
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
      <div className="mt-4">
          <button className="mb-3" onClick={() => setMode('add')}>Add Row</button>
          <RowsList rows={rows} mode={'view'} onEdit={handleEdit} onDisable={handleDisable} onDelete={handleDelete}/>

          {mode === 'add' && (
            <>
            <MyRow mode={'add'} onAdd={handleAdd} onCancel={() => {setMode('view')}} numberRows={numberRows}/> {/* Pass handleAdd to MyRow */}
            </>
            )
          }
        <h4 className="text-align-left">Sum: {sum}</h4>
      </div>
    </>
  )
}

export default App
