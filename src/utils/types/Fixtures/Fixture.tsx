export interface FixtuersProps {
    code:    number;
    status:  boolean;
    errors:  null;
    message: string;
    data:    Data;
}

export interface Data {
    predictions:      Prediction[];
    match_highlights: Match[];
    match_over:       Match[];
}

export interface Prediction {
    id:                       number;
    short_status:             string;
    long_status:              string;
    long_status_trans:        string;
    fixture_date:             string;
    fixture_time:             string;
    fixture_day:              string;
    last_mins_for_prediction: number;
    teams:                    Teams;
    league:                   League;
    check_prediction:         boolean;
    prediction:               prediction | null;
}

export interface Match {
    id:                number;
    short_status:      string;
    long_status:       string;
    long_status_trans: string;
    fixture_date:      string;
    fixture_time:      string;
    fixture_day:       string;
    teams:             Teams;
    league:            League;
    goals:             Goals;
}


export interface Goals {
    home: number | null;
    away: number | null;
}

export interface League {
    id:       number;
    name:     string;
    country?: string;
    logo:     string;
    winner?:  boolean | null;
}



export interface Teams {
    home: League;
    away: League;
}

export interface prediction {
    home_score:number;
    away_score:number;
};