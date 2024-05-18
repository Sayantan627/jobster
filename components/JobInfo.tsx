import React from "react";

const JobInfo = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  return (
    <div className="flex gap-x-2 items-start">
      {icon}
      {text}
    </div>
  );
};
export default JobInfo;
