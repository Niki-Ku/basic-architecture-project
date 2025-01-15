interface ITrailerComponent {
  src: string;
  title: string;
  isError: boolean;
  isLoading: boolean;
}

const TrailerComponent:React.FC<ITrailerComponent> = ({src, title, isError, isLoading}) => {

  if (isError) return <div>Error fetching trailer</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full h-[300px] md:h-[500px] px-5 md:px-10 my-20">
      <iframe
        src={`https://www.youtube.com/embed/${src}`} 
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
        width="100%"
        height="100%"
      ></iframe>
    </div>
  )
};

export default TrailerComponent;
