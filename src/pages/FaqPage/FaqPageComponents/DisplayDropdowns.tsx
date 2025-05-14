import { t } from "i18next";
import DropdownCard from "../../../components/DropdownCard/DropdownCard";
import {
	accountAndBilling,
	startWork,
	Fix,
	Watching,
} from "../../../config/helpCenterConfig";

const DisplayDropdowns = ({
  sectionRef,
  open,
  handleDropdownClick
}: {
	sectionRef: (el: HTMLDivElement | null) => void ;
	open: string;
	handleDropdownClick: (id: string, e: React.MouseEvent) => void;
}) => {
	return (
		<div
			ref={sectionRef}
			className="mb-10 flex flex-col gap-4 max-w-[600px] m-auto"
		>
			{[accountAndBilling, startWork, Fix, Watching].map((item, index) => (
				<DropdownCard
					key={index}
					title={t(item.title)}
					iconColor={item.iconColor}
					icon={item.icon}
					categories={item.categories}
					open={open}
					handleDropdownClick={handleDropdownClick}
				/>
			))}
		</div>
	);
};

export default DisplayDropdowns;
