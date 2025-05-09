import styles from './Card.module.css';

export default function Card({ 
  children, 
  variant = 'default',
  className = '',
  ...props 
}) {
  return (
    <div 
      className={`${styles.card} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}