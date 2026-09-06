// A section sized to its content, with the page gutter and a titled landmark.
const Section = ({ id, title, className = '', children }) => {
  const titleId = `${id}-title`;
  return (
    <section id={id} className={`section wrap ${className}`.trim()} aria-labelledby={title ? titleId : undefined}>
      {title && (
        <h2 id={titleId} className="section__title">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
};

export default Section;
