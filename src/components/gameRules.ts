export function shuffled<T>(items: readonly T[], random = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// One roll per frame: an intentionally short ten-pin challenge, scored out of 50.
export function bowl(aim: number, power: number) {
  const offset = Math.abs(Math.max(0, Math.min(100, aim)) - 50);
  const strength = Math.max(0, Math.min(100, power));
  if (offset >= 44 || strength < 12) return 0;
  const accuracy = Math.max(0, 1 - offset / 48);
  const control = Math.max(.1, 1 - Math.abs(strength - 75) / 90);
  return Math.max(0, Math.min(10, Math.round(10 * accuracy * control)));
}
export function scoreMatch(moves: number) {
  return Math.max(10, 180 - Math.max(0, moves - 6) * 10);
}

export function dropDisc(board: readonly number[], column: number, player: number): number[] | null {
  if (!Number.isInteger(column) || column < 0 || column > 6 || board[column]) return null;
  const next = [...board];
  for (let row = 5; row >= 0; row--) if (!next[row * 7 + column]) { next[row * 7 + column] = player; return next; }
  return null;
}
export function fourWinner(board: readonly number[]): number {
  for (let row = 0; row < 6; row++) for (let col = 0; col < 7; col++) {
    const value = board[row * 7 + col];
    if (!value) continue;
    for (const [dr, dc] of [[0,1],[1,0],[1,1],[1,-1]]) {
      if (row + dr * 3 > 5 || col + dc * 3 < 0 || col + dc * 3 > 6) continue;
      if ([1,2,3].every(n => board[(row+dr*n)*7+col+dc*n] === value)) return value;
    }
  }
  return 0;
}
export function computerColumn(board: readonly number[]): number {
  const available = [3,2,4,1,5,0,6].filter(col => !board[col]);
  for (const player of [2,1]) for (const col of available) {
    if (fourWinner(dropDisc(board,col,player)!) === player) return col;
  }
  // Avoid handing the player an immediate win when another move is available.
  return available.find(col => {
    const next = dropDisc(board,col,2)!;
    return !available.some(reply => { const result = dropDisc(next,reply,1); return result && fourWinner(result) === 1; });
  }) ?? available[0] ?? -1;
}

export function strategicColumn(board:readonly number[],depth=4):number {
  function evaluate(b:readonly number[]):number {
    const winner=fourWinner(b);if(winner)return winner===2?100000:-100000;
    let score=0;b.forEach((v,i)=>{if(v)score+=(v===2?1:-1)*(3-Math.abs(i%7-3));});
    for(let row=0;row<6;row++)for(let col=0;col<7;col++)for(const [dr,dc] of [[0,1],[1,0],[1,1],[1,-1]]){
      if(row+3*dr>5||col+3*dc<0||col+3*dc>6)continue;
      const line=[0,1,2,3].map(n=>b[(row+n*dr)*7+col+n*dc]),us=line.filter(n=>n===2).length,them=line.filter(n=>n===1).length;
      if(!them)score+=[0,1,8,50,10000][us];if(!us)score-=[0,1,9,65,10000][them];
    }return score;
  }
  function search(b:readonly number[],player:number,d:number,alpha:number,beta:number):number{
    if(!d||fourWinner(b)||b.every(Boolean))return evaluate(b);
    let best=player===2?-Infinity:Infinity;
    for(const col of [3,2,4,1,5,0,6]){const next=dropDisc(b,col,player);if(!next)continue;const score=search(next,3-player,d-1,alpha,beta);best=player===2?Math.max(best,score):Math.min(best,score);if(player===2)alpha=Math.max(alpha,best);else beta=Math.min(beta,best);if(beta<=alpha)break;}return best;
  }
  let choice=-1,best=-Infinity;
  for(const col of [3,2,4,1,5,0,6]){const next=dropDisc(board,col,2);if(!next)continue;const value=search(next,1,depth-1,-Infinity,Infinity);if(value>best){best=value;choice=col;}}
  return choice;
}
