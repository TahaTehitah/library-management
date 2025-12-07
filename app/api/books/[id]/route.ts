import { NextResponse, NextRequest } from 'next/server';

import { books } from '../../../../lib/books';
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const id = parseInt(params.id);
  const book = books.find(b => b.id === id);
  if (!book) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }
  return NextResponse.json(book);
}
export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const id = parseInt(params.id);
  const body = await request.json();
  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }
  books[index] = { ...books[index], ...body, id };
  return NextResponse.json(books[index]);
}
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const id = parseInt(params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }
  books.splice(index, 1);
  return NextResponse.json({ message: 'Book deleted' });
}
