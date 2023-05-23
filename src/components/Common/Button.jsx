import styles from './Button.module.scss'

export  function Button({text, active = true, onClick}) {

  let btnStyles = active ? styles.btn__primary : styles.btn__secondary
  return (
	<button className={`${styles.btn} ${btnStyles}`} onClick={onClick}>{text}</button>
  )
}
