


const PreMatchStatBox = ({ label, value }: { label: string; value: number }) => {
    return (
        <div>
            <strong className={"detail-stat-name"}>{label}:</strong> {value}
        </div>
    );
};

export default PreMatchStatBox;

