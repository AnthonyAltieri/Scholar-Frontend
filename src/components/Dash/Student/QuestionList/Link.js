/**
 * @author Anthony Altieri on 9/4/16.
 */

const Link = ({
  active,
  children,
}) => (
  <a className={active ? 'link-active' : 'link-inactive'}>
    {children}
  </a>
);

module.exports = Link;

