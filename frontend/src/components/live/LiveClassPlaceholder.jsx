const LiveClassPlaceholder = ({ title, startTime, meetingLink }) => {
  return (
    <div className="panel-muted p-4 transition hover:bg-white">
      <h4 className="font-semibold text-[#071647]">{title}</h4>
      <p className="mt-1 text-sm text-stone-600">Starts: {new Date(startTime).toLocaleString()}</p>
      <a
        href={meetingLink}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex rounded-md bg-[#2454f4] px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-[#123bd6]"
      >
        Join Live Class
      </a>
    </div>
  );
};

export default LiveClassPlaceholder;
