import {useState} from "react";


const Tabs = ({changeTab}) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
    changeTab(tabNumber)
  };

  return (
    <div className="flex w-full">
      <button
        className={`w-1/2 p-4 text-center border ${
          activeTab === 1 ? 'bg-primary text-blue-500' : 'bg-white text-gray-600'
        }`}
        onClick={() => handleTabChange(1)}
      >
        Tab 1
      </button>
      <button
        className={`w-1/2 p-4 text-center border ${
          activeTab === 2 ? 'bg-primary text-blue-500' : 'bg-white text-gray-600'
        }`}
        onClick={() => handleTabChange(2)}
      >
        Tab 2
      </button>
    </div>
  );
};

export default Tabs;
