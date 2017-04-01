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
(default, (SELECT id FROM months WHERE id=1), 1, 28.5),
(default, (SELECT id FROM months WHERE id=1), 2, 23.5),
(default, (SELECT id FROM months WHERE id=1), 3, 22.5),
(default, (SELECT id FROM months WHERE id=1), 4, 24.5),
(default, (SELECT id FROM months WHERE id=1), 5, 21.5),
(default, (SELECT id FROM months WHERE id=2), 1, 20.5),
(default, (SELECT id FROM months WHERE id=2), 2, 20.8),
(default, (SELECT id FROM months WHERE id=2), 3, 21.8),
(default, (SELECT id FROM months WHERE id=2), 4, 19.8),
(default, (SELECT id FROM months WHERE id=2), 5, 22.8),
(default, (SELECT id FROM months WHERE id=2), 6, 12.8),
(default, (SELECT id FROM months WHERE id=2), 7, 17.8),
(default, (SELECT id FROM months WHERE id=2), 8, 24.8),
(default, (SELECT id FROM months WHERE id=2), 9, 16.8),
(default, (SELECT id FROM months WHERE id=2), 10, 17.8),
(default, (SELECT id FROM months WHERE id=2), 11, 18.8),
(default, (SELECT id FROM months WHERE id=2), 12, 16.8),
(default, (SELECT id FROM months WHERE id=2), 13, 19.8),
(default, (SELECT id FROM months WHERE id=2), 14, 17.8),
(default, (SELECT id FROM months WHERE id=2), 15, 15.8),
(default, (SELECT id FROM months WHERE id=2), 16, 18.8),
(default, (SELECT id FROM months WHERE id=2), 17, 13.8),
(default, (SELECT id FROM months WHERE id=2), 18, 12.8),
(default, (SELECT id FROM months WHERE id=2), 19, 12.8),
(default, (SELECT id FROM months WHERE id=2), 20, 12.8),
(default, (SELECT id FROM months WHERE id=2), 21, 12.8),
(default, (SELECT id FROM months WHERE id=2), 22, 11.8),
(default, (SELECT id FROM months WHERE id=2), 23, 8.8),
(default, (SELECT id FROM months WHERE id=2), 24, 4.8),
(default, (SELECT id FROM months WHERE id=2), 25, 12.8),
(default, (SELECT id FROM months WHERE id=2), 26, 16.8),
(default, (SELECT id FROM months WHERE id=2), 27, 18.8),
(default, (SELECT id FROM months WHERE id=2), 28, 22.8),
(default, (SELECT id FROM months WHERE id=3), 1, 25.5),
(default, (SELECT id FROM months WHERE id=3), 2, 20.8),
(default, (SELECT id FROM months WHERE id=3), 3, 21.8),
(default, (SELECT id FROM months WHERE id=3), 4, 19.8),
(default, (SELECT id FROM months WHERE id=3), 5, 22.8),
(default, (SELECT id FROM months WHERE id=3), 6, 12.8),
(default, (SELECT id FROM months WHERE id=3), 7, 17.8),
(default, (SELECT id FROM months WHERE id=3), 8, 24.8),
(default, (SELECT id FROM months WHERE id=3), 9, 16.8),
(default, (SELECT id FROM months WHERE id=3), 10, 5.8),
(default, (SELECT id FROM months WHERE id=3), 11, 8.8),
(default, (SELECT id FROM months WHERE id=3), 12, 2.8),
(default, (SELECT id FROM months WHERE id=3), 13, 12.8),
(default, (SELECT id FROM months WHERE id=3), 14, 14.8),
(default, (SELECT id FROM months WHERE id=3), 15, 5.8),
(default, (SELECT id FROM months WHERE id=3), 16, 6.8),
(default, (SELECT id FROM months WHERE id=3), 17, 7.8),
(default, (SELECT id FROM months WHERE id=3), 18, 11.8),
(default, (SELECT id FROM months WHERE id=3), 19, 10.8),
(default, (SELECT id FROM months WHERE id=3), 20, 12.8),
(default, (SELECT id FROM months WHERE id=3), 21, 14.8),
(default, (SELECT id FROM months WHERE id=3), 22, 16.8),
(default, (SELECT id FROM months WHERE id=3), 23, 14.8),
(default, (SELECT id FROM months WHERE id=3), 24, 13.8),
(default, (SELECT id FROM months WHERE id=3), 25, 8.8),
(default, (SELECT id FROM months WHERE id=3), 26, 4.8),
(default, (SELECT id FROM months WHERE id=3), 27, 2.8),
(default, (SELECT id FROM months WHERE id=3), 28, 1.8),
(default, (SELECT id FROM months WHERE id=4), 1, 4.5),
(default, (SELECT id FROM months WHERE id=4), 2, 6.2),
(default, (SELECT id FROM months WHERE id=4), 3, 4.2);

