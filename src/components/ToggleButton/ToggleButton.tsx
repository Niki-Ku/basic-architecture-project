interface IToggleButton {
	id: string;
	checked: boolean;
	onChange: () => void;
}

const ToggleButton: React.FC<IToggleButton> = ({ id, checked, onChange }) => {
	return (
		<div className="w-min h-min flex align-center justify-center border-red-secondary border rounded-full">
			<input
				type="checkbox"
				onChange={onChange}
				checked={checked}
				id={`check-${id}`}
				className="hidden peer"
			/>
			<label
				htmlFor={`check-${id}`}
				className="w-[60px] h-[30px] b-rounded bg-toggle-bg rounded-full cursor-pointer relative
        before:absolute before:translate-x-[-30px] before:bg-toggle-text before:w-[28px] before:h-[28px] before:rounded-full before:m-[1.25px]
        peer-checked:before:translate-x-[0px] before:duration-200"
			></label>
		</div>
	);
};

export default ToggleButton;
