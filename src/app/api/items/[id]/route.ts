import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Item } from '@/entities/Item';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Item);
    const item = await repo.findOneBy({ id: params.id });
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error('GET /api/items/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const ds = await getDataSource();
    const repo = ds.getRepository(Item);

    const item = await repo.findOneBy({ id: params.id });
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    repo.merge(item, {
      title: body.title ?? item.title,
      category: body.category ?? item.category,
      description: body.description ?? item.description,
      imageUrl: body.imageUrl !== undefined ? body.imageUrl : item.imageUrl,
      externalLink: body.externalLink !== undefined ? body.externalLink : item.externalLink,
      rating: body.rating !== undefined ? (body.rating ? Number(body.rating) : undefined) : item.rating,
      tags: body.tags !== undefined ? body.tags : item.tags,
      featured: body.featured !== undefined ? (body.featured === true || body.featured === 'true') : item.featured,
    });

    const saved = await repo.save(item);
    return NextResponse.json(saved);
  } catch (error) {
    console.error('PUT /api/items/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Item);
    const item = await repo.findOneBy({ id: params.id });
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    await repo.remove(item);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/items/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
