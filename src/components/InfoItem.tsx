type Props = {
    label: string,
    value: string
}

export const InfoItem = ({label, value}: Props)=>{
    return (
        <div className="my-5 mx-0"> {/* Container */}
            <div className="text-xl font-semibold text-gray-700">{label}</div>
            <div className="text-4xl font-bold text-blue-950">{value}</div>
        </div>
    );
}