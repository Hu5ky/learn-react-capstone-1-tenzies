export default function Die({ value, id, isHeld, holdFunc }) {

    const styles = {
        backgroundColor: isHeld ? "#59E391" : "white"
    }

    return(
        <button className="die" style={styles} onClick={() => holdFunc(id, isHeld)}>{value}</button>
    )
}
