import { useTranslation } from "react-i18next";
import BurgerButton from "../BurgerButton/BurgerButton";
import { Link } from "react-router-dom";

interface IPromotionalBanner {
	image: string;
	alt: string;
	onCloseClick: () => void;
}

const PromotionalBanner: React.FC<IPromotionalBanner> = ({
	image,
	alt,
	onCloseClick,
}) => {
	const { t } = useTranslation();
	return (
		<div className="fixed h-[80dvh] w-[80%] z-30 inset-0 m-auto drop-shadow-[0_0_70px_rgba(0,0,0,0.9)]">
			<img src={image} alt={alt} className="w-full h-full object-cover" />
			<Link
				to={"#"}
				className="absolute bottom-[40px] right-[40px] bg-red-default p-2 rounded"
				onClick={onCloseClick}
			>
				{t('watchNow')}!
			</Link>
			<div className="absolute top-[40px] right-[30px]">
				<BurgerButton
					variant="burgerBlack"
					isOpen
					onClick={onCloseClick}
				></BurgerButton>
			</div>
		</div>
	);
};

export default PromotionalBanner;
