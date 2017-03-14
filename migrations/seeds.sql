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
(default, (SELECT id FROM months WHERE id=3), 1, 25.5),
(default, (SELECT id FROM months WHERE id=3), 2, 20.8),
(default, (SELECT id FROM months WHERE id=3), 3, 21.8),
(default, (SELECT id FROM months WHERE id=3), 4, 19.8),
(default, (SELECT id FROM months WHERE id=3), 5, 22.8),
(default, (SELECT id FROM months WHERE id=3), 6, 12.8),
(default, (SELECT id FROM months WHERE id=3), 7, 17.8),
(default, (SELECT id FROM months WHERE id=3), 8, 24.8),
(default, (SELECT id FROM months WHERE id=3), 9, 16.8),
(default, (SELECT id FROM months WHERE id=3), 10, 8.8),
(default, (SELECT id FROM months WHERE id=4), 1, 2.8),
(default, (SELECT id FROM months WHERE id=4), 2, 5.8),
(default, (SELECT id FROM months WHERE id=4), 3, 6.8),
(default, (SELECT id FROM months WHERE id=4), 4, 8.8),
(default, (SELECT id FROM months WHERE id=4), 5, 4.8),
(default, (SELECT id FROM months WHERE id=4), 6, 9.8),
(default, (SELECT id FROM months WHERE id=4), 7, 8.8),
(default, (SELECT id FROM months WHERE id=4), 8, 2.8),
(default, (SELECT id FROM months WHERE id=4), 9, 1.2),
(default, (SELECT id FROM months WHERE id=4), 10, 3.4);


