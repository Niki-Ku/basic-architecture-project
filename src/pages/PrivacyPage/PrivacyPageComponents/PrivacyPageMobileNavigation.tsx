import { t } from "i18next";
import { useCallback, useState } from "react";
import BurgerButton from "../../../components/BurgerButton/BurgerButton";
import SidebarNavigation from "../../../components/SidebarNavigation/SidebarNavigation";
import { ISidebarNavigation } from "../../../components/SidebarNavigation/SidebarNavigation";

const PrivacyPageMobileNavigation: React.FC<ISidebarNavigation> = ({
	activeTopic,
	setActiveTopic,
	allSections,
	openSection,
}) => {
	const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

	const handleBurgerButtonClick = useCallback(() => {
		setIsMobileSidebarOpen((prev) => !prev);
	}, []);

	return (
		<div className="bg-bg-default relative">
			<BurgerButton
				onClick={handleBurgerButtonClick}
				isOpen={isMobileSidebarOpen}
				variant="burgerBlack"
				background="transparentBlack"
				ariaLabel={t("openSidebarButtonAriaLabel")}
			></BurgerButton>
			{isMobileSidebarOpen && (
				<div className="absolute right-0 w-[309px] p-2 bg-bg-secondary rounded-xl">
					<SidebarNavigation
						activeTopic={activeTopic}
						setActiveTopic={setActiveTopic}
						allSections={allSections}
						openSection={openSection}
					/>
				</div>
			)}
		</div>
	);
};

export default PrivacyPageMobileNavigation;
