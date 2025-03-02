export default function Die({ value, id, isHeld, holdDie }) {

    const styles = {
        backgroundColor: isHeld ? "#59E391" : "white"
    }

    return(
        <button className="die" style={styles} onClick={holdDie}>{value}</button>
    )
}
