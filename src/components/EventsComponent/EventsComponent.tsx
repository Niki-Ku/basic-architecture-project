import { Link } from "react-router-dom";
import { ReactComponent as LinkIcon } from "../../assets/icons/LinkIcon.svg";
import { ReactComponent as ExcelIcon } from "../../assets/icons/EcxelFileIcon.svg";
import { ReactComponent as PdfIcon } from "../../assets/icons/PdfFileIcon.svg";
import { useTranslation } from "react-i18next";

interface IEvent {
	title: string;
	titleLink: string;
	date: Date;
	videoLink: string;
	letterLink: string;
	financialLink: string;
	transcriptLink: string;
}

interface IEvents {
	netflixEvents: IEvent[];
}

const EventsComponent: React.FC<IEvents> = ({ netflixEvents }) => {
	const { t } = useTranslation();
	return (
		<div className="w-full h-min bg-white hover:border-b-red-default hover:border-b-8 drop-shadow-2xl px-8 py-10">
			{netflixEvents.map((e) => (
				<div className="text-black-default">
					<Link
						className="text-lg font-normal block my-3 firts:mt-0 md:text-2xl hover:text-red-default"
						to={e.titleLink}
					>
						{e.title}
					</Link>
					<p className="font-bold text-xs mb-3 md:text-sm">
						{e.date.toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
						{e.date.toLocaleTimeString("en-US", {
							hour: "2-digit",
							minute: "2-digit",
							timeZoneName: "short",
						})}
					</p>
					<div className="flex flex-col gap-2 text-sm md:flex-row flex-wrap md:text-lg gap-x-5">
						<div>
							<Link className="flex gap-2 flex-nowrap hover:text-red-default" to={e.videoLink}>
								<LinkIcon className="w-5 h-5" />
								{t('videoInterview')}
							</Link>
						</div>
						<div>
							<Link className="flex gap-2 flex-nowrap hover:text-red-default" to={e.letterLink}>
								<PdfIcon className="w-5 h-5" />
								{t('letterToShareholders')}
							</Link>
						</div>
						<div>
							<Link className="flex gap-2 flex-nowrap hover:text-red-default" to={e.financialLink}>
								<ExcelIcon className="w-5 h-5" />
								{t('financialStatements')}
							</Link>
						</div>
						<div>
							<Link className="flex gap-2 flex-nowrap hover:text-red-default" to={e.transcriptLink}>
								<PdfIcon className="w-5 h-5" />
								{t('transcript')}
							</Link>
						</div>
					</div>
				</div>
			))}
			<Link className="font-bold md:text-lg text-red-default mt-4 block" to="#">
				{t('allEvents')}
			</Link>
		</div>
	);
};

export default EventsComponent;
