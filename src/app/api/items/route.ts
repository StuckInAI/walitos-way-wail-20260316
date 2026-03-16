import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Item } from '@/entities/Item';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Item);
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const qb = repo.createQueryBuilder('item');

    if (category) {
      qb.andWhere('item.category = :category', { category });
    }
    if (featured === 'true') {
      qb.andWhere('item.featured = :featured', { featured: true });
    }

    qb.orderBy('item.createdAt', 'DESC');
    const items = await qb.getMany();
    return NextResponse.json(items);
  } catch (error) {
    console.error('GET /api/items error:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ds = await getDataSource();
    const repo = ds.getRepository(Item);

    const item = repo.create({
      id: uuidv4(),
      title: body.title,
      category: body.category,
      description: body.description,
      imageUrl: body.imageUrl || null,
      externalLink: body.externalLink || null,
      rating: body.rating ? Number(body.rating) : null,
      tags: body.tags || '',
      featured: body.featured === true || body.featured === 'true',
    });

    const saved = await repo.save(item);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('POST /api/items error:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
