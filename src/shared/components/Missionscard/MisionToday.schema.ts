export interface MissionToday {
    id:        number;
    completed: boolean;
    mission:   Mission;
}

export interface Mission {
    id:                 number;
    title:              string;
    description:        string;
    granted_experience: number;
}
