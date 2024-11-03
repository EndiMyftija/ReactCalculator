import MyRow from "./MyRow";

function RowsList(props) {
    return (
        <>
            <ul>
                {props.rows != null && props.rows.map((row) => 
                <li key={row.key}>
                    <MyRow rowKey={row.key} sign={row.sign} number={row.number} disabled={row.disabled} mode={props.mode} onEdit={props.onEdit} onDisable={props.onDisable} onDelete={props.onDelete}/>
                </li>)}
            </ul>
        </>
    )
}

export default RowsList;