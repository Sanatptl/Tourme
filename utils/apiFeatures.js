class APIfeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  filter() {
    let queryObj = { ...this.queryStr };
    const excludedFeilds = ['page', 'sort', 'fields', 'limit'];
    excludedFeilds.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, (match) => `$${match}`);
    queryObj = JSON.parse(queryStr);
    this.query = this.query.find(queryObj);
    return this;
  }

  hello() {
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createAt');
    }
    return this;
  }

  fields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); //excluding '__v' property here, we can disable directly from the mongoose but that is not the best practice bcz mongoose actully use it internally
    }
    return this;
  }

  page() {
    const page = this.queryStr.page * 1 || 1; //by default displaying page 1
    const limit = this.queryStr.limit * 1 || 2;
    const skipp = (page - 1) * limit;
    this.query = this.query.skip(skipp).limit(limit);

    return this;
  }
}

module.exports = APIfeatures;
