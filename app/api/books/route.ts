import { NextResponse, NextRequest } from 'next/server';
import { books } from '../../../lib/books';
export async function GET() {
  return NextResponse.json(books);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
  const newBook = { id: newId, ...body };
  books.push(newBook);
  return NextResponse.json(newBook, { status: 201 });
}
