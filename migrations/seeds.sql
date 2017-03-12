INSERT INTO
months
VALUES
(default, 'januar'),
(default, 'februar'),
(default, 'march'),
(default, 'april'),
(default, 'mai'),
(default, 'june'),
(default, 'july'),
(default, 'august'),
(default, 'september'),
(default, 'november'),
(default, 'desember');

INSERT INTO
days
VALUES
(default, (SELECT id FROM months WHERE id=1), 1, 25.5),
(default, (SELECT id FROM months WHERE id=1), 2, 20.8),
(default, (SELECT id FROM months WHERE id=1), 3, 22.2),
(default, (SELECT id FROM months WHERE id=1), 4, 23.4);


