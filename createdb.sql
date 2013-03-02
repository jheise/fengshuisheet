CREATE TABLE characters ( 
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    wealth VARCHAR(255),
    char_type VARCHAR(255) NOT NULL,
    juncture VARCHAR(255) NOT NULL,
    melo_hook VARCHAR(1024),
    description VARCHAR(1024),
    notes VARCHAR(1024),
    bod INTEGER NOT NULL,
    mov INTEGER,
    str INTEGER,
    con INTEGER,
    tgh INTEGER,
    ref INTEGER NOT NULL,
    agl INTEGER,
    dex INTEGER,
    spd INTEGER,
    mnd INTEGER NOT NULL,
    cha INTEGER,
    intel INTEGER,
    per INTEGER,
    wil INTEGER,
    chi INTEGER NOT NULL,
    fort INTEGER,
    kfu INTEGER,
    mag INTEGER
);

CREATE TABLE skills( 
    id INTEGER PRIMARY KEY,
    chr INTEGER,
    skill VARCHAR(255) NOT NULL,
    ga VARCHAR(32) NOT NULL,
    bon INTEGER NOT NULL,
    av INTEGER NOT NULL,
    FOREIGN KEY(chr) REFERENCES characters(id)
);

CREATE TABLE schiticks (
    id INTEGER PRIMARY KEY,
    chr INTEGER,
    schitick VARCHAR(256) NOT NULL,
    chi INTEGER NOT NULL,
    shots INTEGER NOT NULL,
    notes VARCHAR(256),
    FOREIGN KEY(chr) REFERENCES characters(id)
);

CREATE TABLE weapons (
    id INTEGER PRIMARY KEY,
    chr INTEGER,
    name VARCHAR(64) NOT NULL,
    dmg INTEGER NOT NULL,
    conceal INTEGER NOT NULL,
    capacity INTEGER,
    notes VARCHAR(256),
    FOREIGN KEY(chr) REFERENCES characters(id)
);

CREATE TABLE notes (
    id INTEGER PRIMARY KEY,
    chr INTEGER,
    note VARCHAR(512) NOT NULL,
    FOREIGN KEY(chr) REFERENCES characters(id)
);
INSERT INTO characters
    (name,char_type,juncture,bod,ref,mnd,chi,kfu)
VALUES
    ('Jin',"Ex. Special Forces","Modern",7,7,7,0,4);
INSERT INTO skills
    (chr,skill,ga,bon,av)
VALUES
    (1,"Martial Arts","agl",9,4);
INSERT INTO weapons
    (chr,name,dmg,conceal)
VALUES
    (1,"Katana",4,1);
