import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Scheduler } from "@aldabil/react-scheduler";

const MasterRoutineV2 = () => {
  const handleLIst = (data) => {
    debugger;
  };
  return (
    <Scheduler
      view="week"
      //navigation={false}
      //disableViewNavigator={true}
      //onConfirm={handleLIst}
      events={[
        {
          event_id: 1,
          title: "Hindi - (Shaijal)",
          start: new Date("2024/4/17 09:30"),
          end: new Date("2024/4/17 10:30"),
        },
        {
          event_id: 2,
          title: "English - (Denvanshu)",
          start: new Date("2024/4/14 10:00"),
          end: new Date("2024/4/14 11:00"),
        },
      ]}
    />
  );
};

export default MasterRoutineV2;
