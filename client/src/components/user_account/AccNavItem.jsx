const AccNavItem = ({ link, text, icon, active }) => (
  <li className={active ? "side-nav--active" : ""}>
    <a href={link}>
      <svg>
        <use xlinkHref={`img/icons.svg#icon-${icon}`} />
      </svg>
      {text}
    </a>
  </li>
);

export default AccNavItem;
