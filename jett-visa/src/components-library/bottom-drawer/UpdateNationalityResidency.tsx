'use client';

interface Props {
  nationality: string;
  residency: string;
  onNationalityClick: () => void;
  onResidencyClick: () => void;
  onSave: () => void;
}

const UpdateNationalityResidency = ({
  nationality,
  residency,
  onNationalityClick,
  onResidencyClick,
  onSave,
}: Props) => {
  return (
    <>
      <h2 className="text-2xl font-semibold text-[#003669] mb-2">
        Update your nationality and Residency
      </h2>

      <p className="text-sm text-[#003669] mb-6">
        Get accurate visa info, pricing and privileges based on your nationality and residency
      </p>

      {/* Nationality */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Select your nationality</p>
        <div
          onClick={onNationalityClick}
          className="h-12 rounded-xl border border-gray-200 px-4 flex items-center cursor-pointer"
        >
          {nationality}
        </div>
      </div>

      {/* Residency */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-2">Select your residency</p>
        <div
          onClick={onResidencyClick}
          className="h-12 rounded-xl border border-gray-200 px-4 flex items-center cursor-pointer"
        >
          {residency}
        </div>
      </div>

      <button
        onClick={onSave}
        className="w-full h-14 bg-[#0A84FF] text-white rounded-xl font-semibold"
      >
        Save
      </button>
    </>
  );
};

export default UpdateNationalityResidency;
