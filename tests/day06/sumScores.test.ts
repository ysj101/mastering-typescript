/**
 * Day06: 配列の集計 - テスト
 */

import { sumScores, type Score } from '../../solutions/day06/sumScores';

describe('Day06: sumScores', () => {
  describe('基本動作', () => {
    it('複数のスコアの合計を計算できる', () => {
      const scores: Score[] = [
        { subject: 'Math', points: 80 },
        { subject: 'English', points: 90 },
        { subject: 'Science', points: 85 },
      ];

      const result = sumScores(scores);

      expect(result).toBe(255);
    });

    it('単一のスコアを正しく処理できる', () => {
      const scores: Score[] = [{ subject: 'Math', points: 100 }];

      const result = sumScores(scores);

      expect(result).toBe(100);
    });

    it('空の配列は0を返す', () => {
      const scores: Score[] = [];

      const result = sumScores(scores);

      expect(result).toBe(0);
    });
  });

  describe('さまざまな点数', () => {
    it('すべて0点の場合は0を返す', () => {
      const scores: Score[] = [
        { subject: 'Math', points: 0 },
        { subject: 'English', points: 0 },
        { subject: 'Science', points: 0 },
      ];

      const result = sumScores(scores);

      expect(result).toBe(0);
    });

    it('満点の合計を計算できる', () => {
      const scores: Score[] = [
        { subject: 'Math', points: 100 },
        { subject: 'English', points: 100 },
        { subject: 'Science', points: 100 },
      ];

      const result = sumScores(scores);

      expect(result).toBe(300);
    });

    it('小数点を含む点数も正しく集計できる', () => {
      const scores: Score[] = [
        { subject: 'Math', points: 85.5 },
        { subject: 'English', points: 92.3 },
        { subject: 'Science', points: 78.7 },
      ];

      const result = sumScores(scores);

      expect(result).toBeCloseTo(256.5, 1);
    });

    it('負の点数も正しく集計できる', () => {
      const scores: Score[] = [
        { subject: 'Math', points: -10 },
        { subject: 'English', points: 50 },
        { subject: 'Science', points: -5 },
      ];

      const result = sumScores(scores);

      expect(result).toBe(35);
    });
  });

  describe('多数のスコア', () => {
    it('10科目の合計を計算できる', () => {
      const scores: Score[] = [
        { subject: 'Math', points: 80 },
        { subject: 'English', points: 85 },
        { subject: 'Science', points: 90 },
        { subject: 'History', points: 75 },
        { subject: 'Geography', points: 70 },
        { subject: 'Physics', points: 88 },
        { subject: 'Chemistry', points: 92 },
        { subject: 'Biology', points: 86 },
        { subject: 'Art', points: 95 },
        { subject: 'Music', points: 89 },
      ];

      const result = sumScores(scores);

      expect(result).toBe(850);
    });

    it('100科目の合計を計算できる', () => {
      const scores: Score[] = Array.from({ length: 100 }, (_, i) => ({
        subject: `Subject${i}`,
        points: 50,
      }));

      const result = sumScores(scores);

      expect(result).toBe(5000);
    });
  });

  describe('readonly 配列の扱い', () => {
    it('readonly 配列を受け取っても正しく動作する', () => {
      const scores: readonly Score[] = [
        { subject: 'Math', points: 80 },
        { subject: 'English', points: 90 },
      ];

      const result = sumScores(scores);

      expect(result).toBe(170);
    });
  });

  describe('元の配列への影響', () => {
    it('元の配列を変更しない（イミュータブル）', () => {
      const scores: Score[] = [
        { subject: 'Math', points: 80 },
        { subject: 'English', points: 90 },
      ];

      const originalScores = [...scores];

      sumScores(scores);

      expect(scores).toEqual(originalScores);
    });
  });

  describe('型の検証', () => {
    it('戻り値の型が number である', () => {
      const scores: Score[] = [{ subject: 'Math', points: 80 }];

      const result = sumScores(scores);

      // 型レベルでの検証（実行時には影響しない）
      const _typeCheck: number = result;
      expect(typeof result).toBe('number');
    });
  });

  describe('実践的なケース', () => {
    it('実際の学生のスコアを集計できる', () => {
      const studentScores: Score[] = [
        { subject: '国語', points: 75 },
        { subject: '数学', points: 88 },
        { subject: '英語', points: 92 },
        { subject: '理科', points: 80 },
        { subject: '社会', points: 85 },
      ];

      const result = sumScores(studentScores);

      expect(result).toBe(420);
    });

    it('合計から平均を計算できる', () => {
      const scores: Score[] = [
        { subject: 'Math', points: 80 },
        { subject: 'English', points: 90 },
        { subject: 'Science', points: 70 },
      ];

      const total = sumScores(scores);
      const average = total / scores.length;

      expect(average).toBe(80);
    });

    it('複数の学生のスコアを集計できる', () => {
      const student1Scores: Score[] = [
        { subject: 'Math', points: 80 },
        { subject: 'English', points: 90 },
      ];

      const student2Scores: Score[] = [
        { subject: 'Math', points: 75 },
        { subject: 'English', points: 85 },
      ];

      const allScores: Score[] = [...student1Scores, ...student2Scores];
      const result = sumScores(allScores);

      expect(result).toBe(330);
    });
  });

  describe('エッジケース', () => {
    it('非常に大きな数値も正しく集計できる', () => {
      const scores: Score[] = [
        { subject: 'Test1', points: 1000000 },
        { subject: 'Test2', points: 2000000 },
        { subject: 'Test3', points: 3000000 },
      ];

      const result = sumScores(scores);

      expect(result).toBe(6000000);
    });

    it('非常に小さな数値も正しく集計できる', () => {
      const scores: Score[] = [
        { subject: 'Test1', points: 0.1 },
        { subject: 'Test2', points: 0.2 },
        { subject: 'Test3', points: 0.3 },
      ];

      const result = sumScores(scores);

      expect(result).toBeCloseTo(0.6, 10);
    });
  });
});
