// MemberCard - avatar (initials), name, role badge and a small role-colored action button.
import styles from './MemberCard.module.css'

/**
 * @param {object} props
 * @param {{id: number, name: string, role: "Leader" | "Member" | "Guest", isActive: boolean}} props.member
 * @param {boolean} props.isSelected - true when this is the selected member (the card gets styles.selected)
 * @param {(memberId: number) => void} props.onSelect - call it with member.id when the card is clicked
 */
export default function MemberCard({ member, isSelected, onSelect }) {
  // TODO: avatar with the initials ("Noa Levi" -> "NL")
  // TODO: name + role badge
  // TODO: button colored by role (Leader=blue, Member=green, Guest=purple), disabled if inactive
  // TODO: inactive member -> the card also gets styles.inactive (faded)
  const splitName=member.name.split(" ").map((n)=>n[0]).join('').toUpperCase();
  
  const roleClass = {
    Leader: styles.leader,
    Member: styles.member,
    Guest: styles.guest
  };
  return (
    <div className={`
    ${styles.card}
    ${isSelected ? styles.selected : ''}
    ${!member.isActive ? styles.inactive : ''}
  `}
  onClick={() => onSelect(member.id)}>
      <div className={styles.avatar}>{splitName}</div>

    <div className={styles.memberInfo}>
     <h3 className={styles.name}>{member.name}</h3>

     <span className={styles.badge}>
        {member.role}
     </span>
    </div>

       <button
        className={`${styles.roleButton} ${roleClass[member.role]}`}
        disabled={!member.isActive}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(member.id);
        }}
      >
        Contact
      </button>
      
    </div>
  )
}
