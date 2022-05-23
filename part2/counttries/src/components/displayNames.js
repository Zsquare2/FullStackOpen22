const DisplayNames = ({ name, handleClick }) => <tr><td>{name.name.common}
<button onClick={() => handleClick(name.name.common)} >show</button> </td></tr>

export default DisplayNames